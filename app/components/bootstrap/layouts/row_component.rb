# frozen_string_literal: true

module Bootstrap
  module Layouts
    class RowComponent < ApplicationComponent
      attr_reader :content

      validates :content, presence: true

      def initialize(id: 'row', data: {}, options: {})
        @id = id
        @options = options
        @data = data
        add_classes
        add_data_attributes
      end

      def add_classes
        super
        @classes += " align-items-#{@options[:align]}" if @options[:align]
        @classes += " justify-content-#{@options[:justify]}" if @options[:justify]
      end
    end
  end
end
